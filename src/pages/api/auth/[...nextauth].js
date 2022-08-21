import NextAuth from 'next-auth'
// import axios from '@/lib/axios'
import GithubProvider from 'next-auth/providers/github'

// const csrf = () => await.fetch('/sanctum/csrf-cookie')

// const login = async ({ setErrors, setStatus, ...props }) => {
//     await csrf()

//     axios
//         .post('/login', props)
//         .then(() => mutate())
//         .catch(error => {
//             if (error.response.status !== 422) throw error

//             setErrors(Object.values(error.response.data.errors).flat())
//         })
// }

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        CredentialsProvider({
            name: 'Credentials',

            credentials: {
                username: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'sanilshakya@gmail.com',
                },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req) {
                const csrf = () => axios.get('/sanctum/csrf-cookie')

                const login = async ({ setErrors, setStatus, ...props }) => {
                    await csrf()

                    setErrors([])
                    setStatus(null)

                    axios
                        .post('/login', props)
                        .then(() => mutate())
                        .catch(error => {
                            if (error.response.status !== 422) throw error

                            setErrors(
                                Object.values(
                                    error.response.data.errors,
                                ).flat(),
                            )
                        })
                }

                console.log('req', req)
                // Add logic here to look up the user from the credentials supplied
                //   const user = { id: 1, name: "J Smith", email: "jsmith@example.com" }

                //   if (user) {
                //     // Any object returned will be saved in `user` property of the JWT
                //     return user
                //   } else {
                //     // If you return null then an error will be displayed advising the user to check their details.
                //     return null

                //     // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                //   }
            },
        }),
    ],
})

import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'
