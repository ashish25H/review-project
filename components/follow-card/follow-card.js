
async function renderFollowCard() {
    let response = await fetch('components/follow-card/follow-card.mustache');
    let template = await response.text();

    let websiteUsers = JSON.parse(localStorage.getItem('users'));
    if(websiteUsers.length === 0){
        $('#follow-card').hide();
    }
    let friends = [];

    let userData = {
        arr: websiteUsers,
    }

    document.getElementById('follow-card').innerHTML = Mustache.render(template, userData);

    const followBtn = document.querySelectorAll('.follow-btn');

    followBtn.forEach((item) => {
        item.addEventListener('click', (event) => {
            event.target.disabled = true;
            event.target.style.backgroundColor = '#8e8e8e';
            let addFriend = {
                name: item.getAttribute('data-name'),
                occupation: item.getAttribute('data-occupation'),
                image: event.target.id,
            }
            friends = JSON.parse(localStorage.getItem('friends'));
            friends.push(addFriend);
            localStorage.setItem('friends', JSON.stringify(friends));

            let indexToDelete = websiteUsers.findIndex(obj => obj.name === item.getAttribute('data-name'));

            if(indexToDelete != -1){
                websiteUsers.splice(indexToDelete, 1);
            }
            localStorage.setItem('users', JSON.stringify(websiteUsers));
            if(websiteUsers.length === 0){
                $('#follow-card').hide();
            }
            renderFollowCard();
            window.renderFriendList();
            window.renderProfileCard();
            let currentUrl = window.location.href;
            if (currentUrl.includes('/friends')) {
                window.renderFriendCard();
            }
        });
    });
}

renderFollowCard();