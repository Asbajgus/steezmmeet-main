const model = {
  app: {
    currentPage: 'home',
    // pages: [
    //   'logInPage', 'registerPage', 'profilePage', 'dashboardPage', 'chatPage',
    //   'createEventPage', 'viewEventPage', 'viewAllEvents', 'galleryPage',
    //   'imagePage', 'videoPage', 'statisticsPage', 'viewAllUsers',
    //   'viewFriendsPage', 'adminPage', 'galleryAdminPage', 'vennListeAdmin'
    // ]
    pages: ['welcomeContainer', 'loginContainer', 'contentContainer', 'galleriContainer', 'chatContainer', 'galleriItemContainer']
  },
  inputs: {
    logInPage: {
      username: '',
      password: '',
    },
    registerPage: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    profilePage: {  
      name: '',
      aboutMe: '',
      favoriteSlope: [],  
      favoriteLocation: [],
      status: false,  
    },
    chatpage: {
      ToUserID: null,
      message: "",
    },
    EventPage: {
      title: '',
      date: '',
      place: '',
      slope: '',
      extraInfo: '',
      attendees: [],
    },
    galleryPage: {
      title: '',
      src: '',
      type: '', 
    },
  },
  data: {
    users: [
      {
        id: 2,
        username: "user2",
        name: "user2name",
        aboutMe: "jeg elsker ski",
        favoriteSlopeID: [1],
        favoriteLocationID: [2],
        status: false,
        chat: [
          {
            ToUserID: 1,
            conversation: [
              {
                date: "11/11/11",
                time: "10:08",
                userID: 2,
                message: "hei hei",
              },
              {
                ToUserID: 3,
                conversation: [
                  {
                    date: "11/11/11",
                    time: "10:15",
                    userID: 2,
                    message: "Hei på deg",
                  },
                ]
              }
            ]
          }
        ],
        friendsID: [1, 3, 4],
        statistics: [
          {
            daysInSlope: 24,
            hoursInSlope: 70,
          },

        ],
      },
      {
        id: 1,
        username: "user1",
        name: "user1name",
        aboutMe: "jeg elsker snowboard",
        favoriteSlopeID: [3],
        favoriteLocationID: [5],
        status: true,
        chat: [
          {
            ToUserID: 2,
            conversation: [
              {
                date: "11/10/11",
                time: "20:08",
                userID: 1,
                message: "hei hei",
              },
              {
                ToUserID: 3,
                conversation: [
                  {
                    date: "09/0101",
                    time: "10:15",
                    userID: 1,
                    message: "helloooooooo :)",
                  },
                ]
              }
            ]
          }
        ],
        friendsID: [2, 3, 4],
        statistics: [
          {
            daysInSlope: 10,
            hoursInSlope: 50,
          },

        ],
      }
    ],
    events: [
      {
        id: 1,
        creatorId: 2,
        title: "hafjell meet",
        date: "2025-07-15",
        place: ["lillehammer", "", ""],
        slope: "blue",
        extraInfo: "",
        attandees: [1, 2, 3],
      }
    ],
    gallery: [ 
      {
        id: 1,
        title: "Triks jeg prøver meg på",
        type: "video",
        src: "videos/sample1.mp4",
      },
      {
        id: 2,
        title: "Triks jeg skal prøve meg på",
        type: "image",
        src: "img/sample2.jpg",
      },
      {
        id: 3,
        title: "Bilde 1",
        type: "image",
        src: "img/sample3.jpg",
      }
    ],
    logo: {
      src: 'img/logo.png',
      alt: 'logo'
    },
  },
};