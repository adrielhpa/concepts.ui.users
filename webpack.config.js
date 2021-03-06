const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, 'tsconfig.json'),
  [/* mapped paths to share */]);

module.exports = {
  mode: "development",
  devServer: {
    crossOriginLoading: true,
    headers: {
      "Access-Control-Allow-Origin": "master.d3bsqhotd35heu.amplifyapp.com",
      "Access-Control-Allow-Methods": "PUT, GET, POST, DELETE",
    },
  },
  output: {
    uniqueName: "users",
    publicPath: "/remoteEntry.js"
  },
  optimization: {
    runtimeChunk: false
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    }
  },
  experiments: {
    outputModule: true
  },
  plugins: [
    new ModuleFederationPlugin({
        library: { type: "module" },

        // For remotes (please adjust)
        name: "users",
        filename: "remoteEntry.js",
        exposes: {
            './Module': './src/app/user/user.module.ts',
        },

        // For hosts (please adjust)
        // remotes: {
        //     "mfe1": "http://localhost:3000/remoteEntry.js",
        // },

        shared: share({
          "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@angular/material": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "bootstrap": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@ngrx/store": { strictVersion: true, requiredVersion: '^13.2.0' },
          "@ngrx/entity": { strictVersion: true, requiredVersion: '^13.2.0' },
          "@ngrx/store-devtools": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "ngx-toastr": { strictVersion: true, requiredVersion: '^14.3.0' },

          ...sharedMappings.getDescriptors()
        })
    }),
    sharedMappings.getPlugin()
  ],
};
