## PlanetPuzzle

During the Eid holiday earlier this month, I read an [article](https://medium.com/@roaakdm/i-won-in-the-flutter-puzzle-hack-challenge-a6015d15c7d2) on Medium about creating a Puzzle game using the Flutter framework by [@Roaa](https://github.com/Roaa94). Its a great game/application. Then I decided to try to recreate the game using the [Fuse SDK](https://fuseopen.com). It took me roughly about 5 hours to recreate it. It's not 100% equals to the original but the main functionality is same, and its really demonstrate the power of Fuse Framework where the whole of the app is written in very short / concise but readable.

Thanks to the original author of the app for providing the [Source code](https://github.com/Roaa94/flutter-puzzle-hack). I'm using the image assets and fonts from the original apps [here](https://github.com/Roaa94/flutter-puzzle-hack/tree/main/assets) and borrow the main algorithm for the slide puzzle and adapt it using Typescript

### Installation
```
npm install -g fuse-sdk // install the Fuse SDK
npm run ios // compile the app for iOS and open the XCode
npm run android // compile the for Android and open the Android Studio
npm run native // compile and run the app for the desktop (Windows, Mac, Linux)
```

### Screenshot

https://user-images.githubusercontent.com/10460131/168485151-5317cbb3-b48d-4bb1-b074-a33514dcca73.mp4


License: MIT
