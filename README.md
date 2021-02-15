# 2020-21 FBLA Coding and Programming Competitive Event

## Take a quiz on your FBLA knowledge
The quiz app is built on Node.js, Electron, React, Webpack, and Typescript and uses MongoDB for storage.  
Refer to RUNNING.md for instructions about running the program.

Source files are located in src/.

## Considerations

### GUI
Electron was chosen as the GUI framework for ease of use and development. ReactJS is an incredibly robust framework which allows the GUI to be updated dynamically. The GUI itself is essentially a webpage and takes design elements from web design that are familiar and intuitive to users, such as a navbar.  
The styling is mostly done through Bulma, a CSS framework. Bulma simplifies UI design with its responsive and modular components.

### Development
React was also chosen because of its flexibility and modularity. It could easily be ported to other platforms such as mobile using React Native. React allows you to separate chunks of code into separate modules which can be reused throughout the program, which is very useful for something like a navbar. This reduces repeated code and makes it more readable.  
Typescript was chosen to use alongside React because it streamlines the development process. Introducing types to Javascript makes it easy to create robust code and reduces bugs.

The project is based off of an `electron-forge` Electron+Webpack+Typescript boilerplate, with React added manually. Webpack makes the building process easier and more robust. I could have chosen something like `create-react-app` to create my boilerplate code, but `electron-forge` is less bloated and more customizable.

### Security
Security is obviously a concern, so steps have been taken to harden the program somewhat. All text inputs are restricted to only alphanumeric characters and potentially underscores, dots, and dashes. All passwords are hashed with bcrypt before being sent to the database. Therefore no plaintext passwords are ever stored.

### Database
The program uses [MongoDB](https://www.mongodb.com/), which is a NoSQL database. MongoDB was chosen because of the JSON-like format of file storage, which is useful since we are using Javascript.

### Generating Reports
Score reports can be exported in PDF format. Originally a direct print option was considered, but exporting to a PDF provides more flexibility to the user, and they can still print the PDF.