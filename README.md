<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="../tempus/asset/tempus.png" alt="Logo" width="300">
  </a>

  <h1 align="center">Tempus</h1>

  <p align="center">
     An introduction to Angular project for the summer students at Dualog
    <br />
  </p>
</p>

## Requirements
 * Need to create an environment variable with the connection string for the Dualog MongoDB server:
   * Linux:
     ````
     export TempusDBConnectionString="<Connection-String>"
     ````
   * Windows:
      ````
      setx TempusDBConnectionString "<Connection-String>"
      ````


## Coding conventions

### Commit naming

All Git Commit Messages should meet the following text format:

```bash
Subject line
(One newline)
Message Body
(One newline)
Ref <###>
```

#### **Rules**

1. Capitalize the Subject.
2. Do not end the Subject line with a period.
3. Message Body should end with at least one issue tracking reference.
4. Use valid MarkDown in the message body.
5. Use the present tense ("Add feature" not "Added feature").
6. Use the **imperative** mood ("Move cursor to..." not "Moves cursor to...").
7. Use the message body to explain what and why vs. how.

### **Branch naming**

| Naming                            | When to use?                  |
| --------------------------------- | ----------------------------- |
| `feature/awesome-branch-name`     | When developing a new feature |
| `bugfix/awesome-branch-name`      | When fixing a bug             |
| `hotfix/awesome-branch-name`      | When fixing an urgent bug     |
| `docs/awesome-branch-name`        | When updating documentation   |
| `tooling/awesome-branch-name`     | When changing tooling         |
| `performance/awesome-branch-name` | When improving performance    |
| `refactoring/awesome-branch-name` | When refactoring code         |
| `cosmetic/awesome-branch-name`    | When improving UI/Cosmetic    |
| `testing/awesomest-branch-name`   | When adding tests             |
