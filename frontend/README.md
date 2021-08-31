# Dashboard

This project is initialized with [Dashboard](https://pro.ant.design). Follow is the quick guide for how to use.

## Environment Prepare

Install `node_modules`:

```bash
yarn install
```

or

```bash
yarn
```

## Docker

Build the front end docker image

```sh
docker build -t blockchain/frontend .

docker images

# run the docker container

```

## Provided Scripts

Dashboard provides some useful script to help you quick start and build with web project, code style check and test.

Scripts provided in `package.json`. It's safe to modify or add additional script:

### Start project

```bash
yarn start
```

### Build project

```bash
yarn run build
```

### Check code style

```bash
yarn run lint
```

You can also use script to auto fix some lint error:

```bash
yarn run lint:fix
```

### Test code

```bash
yarn test
```

## More

You can view full document on our [official website](https://pro.ant.design). And welcome any feedback in our [github](https://github.com/ant-design/ant-design-pro).
