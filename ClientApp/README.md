  <h1 align="center">Client</h1>

## Usage

### Development

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Docker

Run `docker build --build-arg MYGET=$MYGET_DUALOG_TOKEN -t <tag> .` to build the Docker image.

Run `docker run -d -p 80:80 --name <name> <tag>` to run the Docker image.
