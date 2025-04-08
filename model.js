const model = {
  app: {
    currentPage: 'home',
    pages: ['welcomeContainer', 'loginContainer', 'contentContainer', 'galleriContainer', 'chatContainer', 'galleriItemContainer', 'eventContainer', 'friendContainer']
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
          { week: 1, daysInSlope: 5, hoursInSlope: 20 },
          { week: 2, daysInSlope: 4, hoursInSlope: 18 },
          { week: 3, daysInSlope: 6, hoursInSlope: 24 },
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
          { week: 1, daysInSlope: 5, hoursInSlope: 20 },
          { week: 2, daysInSlope: 4, hoursInSlope: 18 },
          { week: 3, daysInSlope: 6, hoursInSlope: 24 },
        ],
      }
    ], 
    locations: [
      {
        id: 1,
        location: "Hemsedal",
        slopes: [
          { id: 1, name: "Totten-Hemsedal", difficulty: "Easy" },
          { id: 2, name: "Tottenløypa No. 5", difficulty: "Difficult" },
          { id: 3, name: "Sahaugløypa No. 8", difficulty: "Intermediate" },
          { id: 4, name: "Midtløypa No. 14", difficulty: "Intermediate" },
          { id: 5, name: "Skarløypa No. 17", difficulty: "Intermediate" },
          { id: 6, name: "Hemsedalløypa No. 10", difficulty: "Intermediate" },
          { id: 7, name: "Slope No. 32 (Fun Ride)", difficulty: "Easy" },
          { id: 8, name: "SnowPark Red", difficulty: "Difficult" },
          { id: 9, name: "SnowPark Blue", difficulty: "Intermediate" },
          { id: 10, name: "Skicross Track", difficulty: "Intermediate" }
        ],
      },
      {
        id: 2,
        location: "Trysil",
        slopes: [
          { id: 1, name: "Trysilfjellet-Trysil", difficulty: "Easy" },
          { id: 2, name: "Ekspert'n", difficulty: "Difficult" },
          { id: 3, name: "Eventyr", difficulty: "Easy" },
          { id: 4, name: "Valle's Ski Area", difficulty: "Easy" },
          { id: 5, name: "Snow Park Red & Black", difficulty: "Difficult" },
          { id: 6, name: "Snow Park Blue", difficulty: "Intermediate" },
          { id: 7, name: "Snow Park Green", difficulty: "Easy" },
          { id: 8, name: "Fun Ride", difficulty: "Intermediate" },
          { id: 9, name: "Ski Cross Track", difficulty: "Intermediate" },
          { id: 10, name: "Parallel Slalom Course", difficulty: "Intermediate" }
        ]
      },
      {
        id: 3,
        location: "Hafjell",
        slopes: [
          { id: 1, name: "Hafjell Alpine Centre", difficulty: "Intermediate" },
          { id: 2, name: "Lilleputthammer", difficulty: "Easy" },
          { id: 3, name: "Hafjell Bike Park", difficulty: "Difficult" },
          { id: 4, name: "Hafjell Snow Park", difficulty: "Intermediate" },
          { id: 5, name: "Hafjell Cross-Country Arena", difficulty: "Easy" }
        ]
      },
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
        attendees: [1, 2, 3],
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