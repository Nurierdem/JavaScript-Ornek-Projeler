class UI {
    constructor() {
        this.profileContentDiv = document.querySelector("#profileContentDiv");
        this.githubNameInput = document.querySelector("#githubname");
        this.tableContent = document.querySelector("#tableContent");
        this.table = document.querySelector("#table");
        this.searchedUserList = document.querySelector("#searchedUserList");
        this.isShowRepo = true;
    }

    fillSearchedUserToUIFromStorage(){
       const users = Storagex.getSearchedUserFromStorage();
       if(users!=null && users.length>0){
        users.forEach(user =>{
            const li = document.createElement("li");
            li.className = "list-group-item";
            li.textContent = user;
            this.searchedUserList.appendChild(li);
        })
       }
    }

    addSearchedUserToUI(username) {
        if (Storagex.checkUser(username)) {
            const li = document.createElement("li");
            li.className = "list-group-item";
            li.textContent = username;
            this.searchedUserList.appendChild(li);
        }
    }

    addUserProfileToUI(user) {
        this.profileContentDiv.innerHTML = `
        <div class="col-sm-12 col-md-4 col-lg-4">
        <div id="profileDiv">
            <img id="profilImg" class="mb-3" src="${user.avatar_url}" width="200" height="200" alt="${user.login}">
            <hr style="border:2px solid rgba(102, 126, 234, 0.2); width:80%; margin: 20px 0;">
            <span style="font-size: 22px; font-weight: bold;">${user.name || user.login}</span>
            <span style="font-size: 16px; color: #666;">${user.bio || "Yazılım Geliştirici"}</span>
            ${user.blog ? `<a href="${user.blog}" target="_blank" style="margin-top: 10px; color: #667eea; text-decoration: none;"><i class="fas fa-link"></i> Website</a>` : ''}
        </div>
    </div>

    <div class="col-sm-12 col-md-8 col-lg-8">
        <div id="badgeDiv" class="mt-1">
            <button type="button" class="btn btn-primary">
                <i class="fas fa-users"></i> Takipçi <span class="badge badge-light">${user.followers}</span>
              </button>
              <button type="button" class="btn btn-success">
                <i class="fas fa-user-plus"></i> Takip Edilen <span class="badge badge-light">${user.following}</span>
              </button>
              <button type="button" class="btn btn-secondary">
                <i class="fas fa-code-branch"></i> Repolar <span class="badge badge-light">${user.public_repos}</span>
              </button>
        </div>

        <div id="infoDiv" class="mt-3">
            ${user.company ? `
            <div class="info">
                <img src="images/company.png" width="40" height="40" alt="Company">
                 <span><i class="fas fa-building"></i> ${user.company}</span>
            </div>` : ''}
            ${user.location ? `
            <div class="info">
                <img src="images/location.png" width="40" height="40" alt="Location">
                 <span><i class="fas fa-map-marker-alt"></i> ${user.location}</span>
            </div>` : ''}
            ${user.email ? `
            <div class="info">
                <img src="images/mail.png" width="40" height="40" alt="Email">
                 <span><i class="fas fa-envelope"></i> ${user.email}</span>
            </div>` : ''}
            ${user.twitter_username ? `
            <div class="info">
                <i class="fab fa-twitter" style="font-size: 24px; color: #1DA1F2;"></i>
                <span><a href="https://twitter.com/${user.twitter_username}" target="_blank" style="color: #333; text-decoration: none;">@${user.twitter_username}</a></span>
            </div>` : ''}

            <div class="info">
                <a id="showRepo" href="#" style="display: flex; align-items: center;">
                    <i class="fas fa-folder-open" style="margin-right: 10px;"></i> Repoları Göster
                </a>
            </div>
        </div>
    </div>
        `;
    }

    checkMessage() {
        const showRepoLink = document.querySelector("#showRepo");
        if (showRepoLink) {
            if (this.isShowRepo) {
                showRepoLink.innerHTML = '<i class="fas fa-folder-open"></i> Repoları Göster';
            } else {
                showRepoLink.innerHTML = '<i class="fas fa-folder"></i> Repoları Kapat';
            }
        }
    }

    showRepos(repos) {
        if (this.isShowRepo) {
            if (repos != null && repos.length > 0) {
                this.tableContent.innerHTML = ""; // Önce temizle
                let sayac = 1;
                repos.forEach(repo => {
                    const date = new Date(repo.created_at).toLocaleDateString('tr-TR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });
                    this.tableContent.innerHTML += `
                    <tr>
                    <th scope="row">${sayac}</th>
                    <td>
                        <a href="${repo.html_url}" target="_blank" style="color: #667eea; text-decoration: none; font-weight: 600;">
                            <i class="fab fa-github"></i> ${repo.name}
                        </a>
                        ${repo.description ? `<br><small style="color: #666;">${repo.description.substring(0, 100)}${repo.description.length > 100 ? '...' : ''}</small>` : ''}
                    </td>
                    <td>${date}</td>
                  </tr>
                    `;
                    sayac++;
                })
            } else {
                this.tableContent.innerHTML = `
                    <tr>
                        <td colspan="3" style="text-align: center; padding: 30px; color: #666;">
                            <i class="fas fa-folder-open" style="font-size: 48px; margin-bottom: 10px; display: block;"></i>
                            Henüz repo bulunmuyor.
                        </td>
                    </tr>
                `;
            }
            this.isShowRepo = false;
            this.checkMessage();
        } else {
            this.isShowRepo = true;
            this.checkMessage();
            this.tableContent.innerHTML = "";
        }
    }

     clearSearchedUsers(){
        this.searchedUserList.innerHTML="";
    }

    clearInput() {
        this.githubNameInput.value = "";
        this.profileContentDiv.innerHTML = "";
        this.tableContent.innerHTML="";
    }
}