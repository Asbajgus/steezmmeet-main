const model = {
  app: {
    currentPage: 'home',
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
        name: "User Two",
        aboutMe: "I love skiing!",
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
                message: "Hello!",
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
        name: "User One",
        aboutMe: "I love snowboarding!",
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
                message: "Hi there!",
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
      }, 
      {
        id: 3,
        username: "user3",
        name: "User Three",
        aboutMe: "I love both skiing and snowboarding!",
        favoriteSlopeID: [2],
        favoriteLocationID: [4],
        status: true,
        chat: [
          {
            ToUserID: 1,
            conversation: [
              {
                date: "11/12/11",
                time: "15:08",
                userID: 3,
                message: "Hey!",
              }
            ]
          }
        ],
        friendsID: [1, 2, 4],
        statistics: [
          {
            daysInSlope: 5,
            hoursInSlope: 20,
          },
        ],
      }, 
      {
        id: 4,
        username: "user4",
        name: "michal",
        aboutMe: "I love skiing!",
        favoriteSlopeID: [1],
        favoriteLocationID: [2],
        status: false,
        chat: [
          {
            ToUserID: 1,
            conversation: [
              {
                date: "11/13/11",
                time: "10:08",
                userID: 4,
                message: "Hello!",
              }
            ]
          }
        ],
        friendsID: [1, 3],
        statistics: [
          {
            daysInSlope: 24,
            hoursInSlope: 70,
          },
        ],
      }
    ],
    events: [
      {
        id: 1,
        creatorId: 2,
        title: "Hafjell Meet",
        date: "2025-07-15",
        place: ["Lillehammer"],
        slope: "Blue",
        extraInfo: "A fun skiing event!",
        attendees: [1, 2],
      },
      {
        id: 2,
        creatorId: 1,
        title: "Snowboard Jam",
        date: "2025-08-20",
        place: ["Oslo"],
        slope: "Red",
        extraInfo: "Snowboarding competition.",
        attendees: [1, 3],
      }, {
        id: 3,
        creatorId: 1,
        title: "Fall Festival",
        date: "2025-08-15",
        place: ["Fall"],
        slope: "Red",
        extraInfo: "Musikk festival.",
        attendees: [1, 2,3],
      }
    ],
    gallery: [ 
      {
        id: 1,
        title: "Tricks I'm Trying",
        description: "A video of tricks I am practicing.",
        type: "video",
        src: "videos/sample1.mp4",
      },
      {
        id: 2,
        title: "Future Tricks",
        description: "An image of tricks I plan to try.",
        type: "image",
        src: "img/sample2.jpg",
      },
      {
        id: 3,
        title: "Beautiful Slope",
        description: "A stunning view from the slopes.",
        type: "image",
        src: "img/sample3.jpg",
      }
    ],
    logo: {
      src: 'img/logo.png',
      alt: 'Steez Meet Logo'
    },
  },
};