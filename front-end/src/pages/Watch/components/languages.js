//The versions here are hard-coded in. However, it would be a good idea to fetch the versions from a API so that the versions are kept up to date.
export const LANGUAGE_VERSIONS = {
  javascript: "18.15.0",
  typescript: "5.0.3",
  python: "3.10.0",
  java: "15.0.2",
  csharp: "6.12.0",
};

export const HELLO_WORLD = {
  javascript: '//JavaScript\nconsole.log("Welcome to ByteEd!");',
  typescript:
    "//TypeScript\nlet message: string = 'Welcome to ByteEd!'\nconsole.log(message);",
  python: '#Python\nprint("Welcome to ByteEd!")',
  java: '//Java\nclass HelloWorld {\n\tstatic public void main( String args[] ) {\n\t\tSystem.out.println( "Welcome to ByteEd!" );\n\t}\n}',
  csharp:
    '//C#\nnamespace HelloWorld\n{\n\tclass Hello {\n\t\tstatic void Main(string[] args)\n\t\t{\n\t\t\tSystem.Console.WriteLine("Welcome to ByteEd!");\n\t\t}\n\t}\n}',
};
