<h1 align="center">Backend</h1>

## Usage

### Docker

Run `docker build -t <tag> .` to build Docker image.

Run `docker run -d -p 5000:80 -e TempusDBConnectionString=$TempusDBConnectionString --name <name> <tag>` to run Docker image.
