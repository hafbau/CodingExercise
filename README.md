# Solving AltaML Interview Coding Exercise

## The Challenge:

> In this repo, there is a compressed file with a number of text files. Inside the text files, you will see characters such as LLRFLFLF. Imagine you're a turtle starting at 0,0 that needs to follow the directions in the text file. Each letter represents a movement, L means the turtle turns counterclockwise, R means the turtle turns clockwise, and F means forward. Note, turning the turtle only changes the turtle's orientation.

> Write an App that takes in a text file like the one provided that displays in a visual manner the path the turtle travels and highlights the locations where the turtle crosses his own path. You can be creative as you would like with the interface but it must show in a visual manner the following: 1) The end location of the turtle, 2) The full path that that turtle travelled and 3) all of the points where the turtle has traveled to more than once ("FFFLFFLLF" would, for example return: (-1,3))

> The application's front end can be written using any framework/language you see fit but any backend work needs to be written using Python. Unit tests are encouraged but not required. When you have it complete please add it to your github and send us a link. The more user friendly the UI the better.

> Reach out if you have any clarifying questions. We look forward to seeing what you come up with.


## Contents of this repo

The repo has three root level folders - two of which are important, the third is a scrapbook.

- `backend` is the business logic written in python. The backend exposes a rest api with which the gui communicates.
- `gui` is a face to the brain. This is written with ReactJS.
- `turtle_maze_js` is JS version of the Python business logic - just an exercise in getting to an answer.

## To run this app:

- Use the structure of backend/.env.example to create a `.env` file with similar contents. Right now, you could just rename the file from `.env.example` to `.env`

### Containerized (Recommended)

```
docker-compose up
```

> You may need to install Docker and docker-compose first


## How the face looks:

