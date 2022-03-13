import Local from './Local';

class Api {
//Log in user
    static async loginUser(username, password) {
        // Prepare URL and options
        let url = '/user-login';
        let body = { username, password };
        let options = { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        };

        // Fetch
        let response;
        try {
            response = await fetch(url, options);
            if (response.ok) {
                response.data = await response.json();
            } else {
                response.error = `Error ${response.status}: ${response.statusText}`;
            }
        } catch (err) {
            response = { ok: false, error: err.message };
        }

        return response;
    }

    // Register a user

    static async userSignUp(username, password, email) {
        let body = { username, password, email };
        let options = { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        };
        let response;
        try {
            response = await fetch('/user-register', options);
            if (response.ok) {
                response.data = await response.json();
            } else {
                response.error = `Error ${response.status}: ${response.statusText}`;
            }
        } catch (err) {
            response = { ok: false, error: err.message };
        }

        return response;
    }


   // Get all users

    static async getUsers() {
        // Prepare URL and options
        let url = '/users';
        let options = { method: 'GET' };

        // Fetch
        let response;
        try {
            response = await fetch(url, options);
            if (response.ok) {
                response.data = await response.json();
            } else {
                response.error = `Error ${response.status}: ${response.statusText}`;
            }
        } catch (err) {
            response = { ok: false, error: err.message };
        }

        return response;
    }


    // GET user data by id

    static async getUser(userId) {
        // Prepare URL and options
        let url = `/users/${userId}`;
        let options = { method: 'GET', headers: {} };

        // Add JWT token (if it exists)
        let token = Local.getToken();
        if (token) {
            options.headers['Authorization'] = 'Bearer ' + token;
        }

        // Fetch
        let response;
        try {
            response = await fetch(url, options);
            if (response.ok) {
                response.data = await response.json();
            } else {
                response.error = `Error ${response.status}: ${response.statusText}`;
            }
        } catch (err) {
            response = { ok: false, error: err.message };
        }

        return response;
    }


    // General purpose GET (for routes like /members-only)
    
    static async getContent(route) {
        // Prepare URL and options
        let url = route;
        let options = { method: 'GET', headers: {} };

        // Add JWT token (if it exists) in case content is protected
        let token = Local.getToken();
        if (token) {
            options.headers['Authorization'] = 'Bearer ' + token;
        }

        // Fetch
        let response;
        try {
            response = await fetch(url, options);
            if (response.ok) {
                response.data = await response.json();
            } else {
                response.error = `Error ${response.status}: ${response.statusText}`;
            }
        } catch (err) {
            response = { ok: false, error: err.message };
        }

        return response;
    }


     // Update user data

     static async updateUserData (updatedUser, route) {
        // Prepare options
        let options = { 
            method: 'PATCH', 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(updatedUser) 
            };
        // Add JWT token (if it exists) in case content is protected
        let token = Local.getToken();
        if (token) {
            options.headers['Authorization'] = 'Bearer ' + token;
        }
        let response;
        try {
            response = await fetch(route, options);
            if (response.ok) {
                response.data = await response.json();
            } else {
                response.error = `Error ${response.status}: ${response.statusText}`;
            }
        } catch (err) {
            response = { ok: false, error: err.message };
        }

        return response;
    }

}

export default Api;