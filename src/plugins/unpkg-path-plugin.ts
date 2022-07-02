import * as esbuild from 'esbuild-wasm';


export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {

			// RESOLVE
			// Case 1: index.js is located in root 
			build.onResolve({ filter: /(^index\.js$)/ }, (args?: any) => {
				return { path: 'index.js', namespace: 'a' };
			});

			// Case 2: index.js is located a relative path
			build.onResolve({ filter: /^\.+\//}, (args: any) => {
				return {
					namespace: 'a',
					path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href,
				};
			});

			// Case 3: handle the main file of the module
      build.onResolve({ filter: /.*/ }, async (args: any) => {
				return {
					namespace: 'a',
					path: `https://unpkg.com/${args.path}`
				};
      });

      
		},
  };
};
