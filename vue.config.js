const px2rem = require('postcss-px2rem')
const postcss = px2rem({
    remUnit: 37.5
})


module.exports = {
    runtimeCompiler: true,
    css:{
        loaderOptions:{
            postcss:{
                plugins:[
                    postcss
                ]
            }
        }
    }

}