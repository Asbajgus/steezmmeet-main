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
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        name: "User Two",
        aboutMe: "I love skiing!",
=======
=======
>>>>>>> Stashed changes
        password: "pass2",
        name: "user2name",
        aboutMe: "jeg elsker ski",
>>>>>>> Stashed changes
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
        friendsID: [1, 3],
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
<<<<<<< Updated upstream
        name: "User One",
        aboutMe: "I love snowboarding!",
=======
        name: "user1name",
        password: "pass1",
        aboutMe: "jeg elsker snowboard",
>>>>>>> Stashed changes
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
        friendsID: [2, 3],
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