//The versions here are hard-coded in. However, it would be a good idea to fetch the versions from a API so that the versions are kept up to date.
export const LANGUAGE_VERSIONS = {
  javascript: "18.15.0",
  typescript: "5.0.3",
  python: "3.10.0",
  java: "15.0.2",
};

export const HELLO_WORLD = {
  javascript: '\n //Hello World in JavaScript \nconsole.log("Hello World!");',
  typescript: '\n //Hello World in TypeScript \nalert("Hello World!");',
  python: '\n #Hello World in Python \nprint("Hello World!")',
  java: '\nclass HelloWorld {\n\tstatic public void main( String args[] ) {\n\t\tSystem.out.println( "Hello World!" );\n\t}\n}',
};
