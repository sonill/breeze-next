import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head></Head>
                <body className="antialiased">
                    <Main />
                    <NextScript />

                    <script
                        type="module"
                        src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
                    <script
                        nomodule
                        src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
                </body>
            </Html>
        )
    }
}

export default MyDocument
