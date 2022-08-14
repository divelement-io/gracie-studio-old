# plop

## Overview

[plop](https://plopjs.com/documentation/) is a  "micro-generator framework". For this project, we are using it help with generating component directories.

## Running the plop command

To launch the command line interface simply run:

```
yarn plop
```

Then you will be prompted to name the Component directory and the path to the directory. Once that is done plop will create the files based on the [handlebar](https://handlebarsjs.com/) templates in this folder.

## Editing the plop templates

Simply edit any of the files in this folder to change the output. If you want to add a plop command you can do this in the `plopfile.js` in the root. All the documentation for the library can be found [here](https://plopjs.com/documentation/)
