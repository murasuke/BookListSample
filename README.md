# 秀和システム「フロントエンド開発入門 プロフェッショナルな開発ツールと設計・実装 」の実装メモ
本に記載してある情報だけでは実装が難しい所があるので、随時追加

- 下記ページに本の各章に対応した形でbranchが作成されている。(各章に対応したソースを見ることができる)

    https://github.com/n05-frontend/shuwa-frontend-book-app/tree/


## 実装メモ
- 6-1 フロントエンド環境の構築
    - windowsから実行する場合
        
        Docker Desktop WSL 2 backend を導入しておく。https://qiita.com/JhonnyBravo/items/d53cbe018233c3c1430a

        docker composeを実行する前に、Docker DesktopとWSL2両方を起動しておくこと。

    - （自分の環境では)babelインストール後、ビルドでエラーが発生した

        > Module not found: Error: Can't resolve 'babel-loader' in    'C:\Users\t_nii\Documents\git\frontend\shuwa-frontend-book-app'

        babel-loaderを再インストールすることで解消
        > yarn add babel-loader

- 6-2 TypeScript の導入
    - lint実行でエラー

        tsconfig.jsonがないため発生していたので、下記コマンドで生成(デフォルトから変更不要)
        > tsc --init

    - yarn run buildでエラー。import時の拡張子の問題だと思われる。resolveで省略可能な拡張子を追加
        > ERROR in ./src/app.ts 2:0-54 Module not found: Error: Can't resolve ～

        webpack.config.js に下記を追加
        ```json
        resolve: {
            extensions: ['.js', '.ts']
        },
        ```
    - コンパイル、実行ができるようになったがsourcemapがないとブラウザからのデバッグが不便なのでwebpack.config.jsに下記行を追加
        ```json
        devtool: "inline-source-map"
        ```

- 6-3 コードの分割
- 6-4 Jest を利用したユニットテスト
    - jestでエラーになる(yarn run test)
        >  Error: Jest: 'ts-node' is required for the TypeScript configuration files. Make sure it is installed

        エラーメッセージより、ts-nodeが必要とのことなので導入する。

        > yarn add ts-node --dev

    - （自分の環境では)yarn run test は正常に実行出来たが、VSCodeで型参照エラーが発生。

        tsconfig.json のtypesに"jest"を追加したら解消したが、typesを指定した場合、/node_modules/@types が自動的に読み込まれなくなる(指定したtypesだけ)になり、不都合なので元に戻した。(エディタ再起動でもよかったかもしれない)
        ```json
        // "types": [],
        　↓
        "types": ["jest"],
        ```

- 6-5 React の導入
    - app.ts ファイル名を変更する
        > git mv app.ts app.tsx
    
    - webpack.config.js のentryのファイル名も合わせて変更する。
        > entry: './src/app.tsx',

    - jsxファイルのコンパイルエラーが起こるのでtsconfig.jsonのオプションを変更する(--jsxが設定されていません)
        > "jsx": "react",

    - webpack-dev-serverの起動時にエラーが発生する。Error: Cannot find module 'webpack-cli/bin/config-yargs'
        原因は、webpack-cliのver4からから上記パッケージが削除されたため。

        対策「webpack serve」に変更する。（packege.jsonの"scripts"に「"serve": "webpack serve"」を追加する)

    - ブラウザで実行時に非同期関数の実行時エラーが発生する（regeneratorRuntime is not defined）
        babel-loader 8 でasync/awaitを動作させるためには、@babel/polyfillが必要

        > yarn add @babel/polyfill --dev	

        webpack.config.js の entryを修正する	

	    > entry: ["@babel/polyfill","./src/app.tsx"],

    - 実行時にブラウザ側でReviewのkeyが重複しているという警告が発生する。
        バックエンド側で生成されたReviewsのIDが重複しているため。

        main.goを修正して、dockerを再起動すれば警告は発生しなくなる。
        > Reviewsの2件目のIDを「2」に変更する。


    

- 6-6 Enzyme を使ったコンポーネントのテスト
- 6-7 styled-components の導入
- 7-1 CI/CD によって受けられるメリット
- 7-2 パフォーマンスと改善



## 実行環境
本アプリケーションは下記環境を想定して実装されています。
ご自身の環境で利用する場合は各種ツールのバージョンをご確認の上で利用してください。

- Docker: 19.x
- Node.js: 12.x
- Yarn: 1.22.x

### API の環境構築手順
```bash
git clone git@github.com:n05-frontend/shuwa-frontend-book-app.git
cd shuwa-frontend-book-app
docker-compose build # 2回目以降は不要
docker-compose up -d # Docker コンテナ起動
```

## 書籍情報
- [フロントエンド開発入門 プロフェッショナルな開発ツールと設計・実装](https://www.shuwasystem.co.jp/book/9784798061771.html)
