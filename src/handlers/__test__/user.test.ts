import * as user from '../user'

describe('user handler', () => {
    it('should create a new user', async () => {
        const req = {username: 'nick', password: 'qwerty'}
        const res = {json({token}) {
            expect(token).toBeTruthy()
        }}

        await user.createNewuser(req, res, () => {})
    })
})