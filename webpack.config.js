const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    mode: "development", // приложение находится в разработке. Выходные файлы не сжимаются.
    entry: "./src/index.js", // входной файл с которого начинается запуск приложения.
    output: {
        path: path.resolve(__dirname, "dist"),  // путь где Webpack будет собирать файлы
        filename: "[name].[hash].js" // Regexp для хэширования файлов (бандлы с уникальными именами)
    },
    devServer: {
        port: 3007
    },
    plugins: [
        new HTMLWebpackPlugin({template: "./src/index.html"}),
        new CleanWebpackPlugin()
        /* webpack предоставляет огромное количество плагинов
        например: html-webpack-plugin переносит html в папку dist и импортирует все необходимы js бандлы;
        clean-webpack-plugin - очищает неиспользуемые бандлы.
        */
    ],
    module: {
        rules: [    // лоудеры для препроцессора less, для загрузки и использования файлов на проекте file-loader
            {
                test: /\.(css|less)$/,
                use: ["style-loader", "css-loader", "less-loader"]
            },
            {
                test: /\.(jpg|jpeg|png|svg)$/,
                use: ["file-loader"]
            }
        ]
    }

}
