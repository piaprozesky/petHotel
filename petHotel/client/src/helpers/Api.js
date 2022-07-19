import Local from "./Local";

class Api {
  //Log in a user
  static async loginUser(username, password) {
    let body = { username, password };

    return await this._doFetch("/login", "POST", body);
  }

  // Get all users
  static async getUsers() {
    return await this._doFetch("/users");
  }

  // Get data for user with ID 'userId'
  static async getUser(userID) {
    return await this._doFetch(`/users/${userID}`);
  }

  // Get data for needs with ID 'needsID'
  static async getNeeds() {
    return await this._doFetch(`/needs`);
  }

  // General purpose GET (for URLs like /members-only)
  static async getContent(url) {
    return await this._doFetch(url);
  }

  // Register new user
  static async newUser(username, name, email, password, profilepicture, host) {
    let body = { username, name, email, password, profilepicture, host };

    return await this._doFetch("/register", "POST", body);
  }

  // Register new pet
  static async newPet(
    name,
    species,
    breed,
    description,
    fk_user,
    medical,
    exercise,
    food,
    special
  ) {
    let body = {
      name,
      species,
      breed,
      description,
      fk_user,
      medical,
      exercise,
      food,
      special,
    };

    return await this._doFetch("/pets/register", "POST", body);
  }

  // Register new accomodation
  static async newAccomodation(address, photo_place, fk_user) {
    let body = { address, photo_place, fk_user };

    return await this._doFetch("/accommodation", "POST", body);
  }

  // Register new accomodationNeeds
  static async newAccommodateNeeds(medical, exercise, food, special) {
    let body = { medical, exercise, food, special };

    return await this._doFetch("/accomodateNeeds", "POST", body);
  }

  // Register new needs
  static async newNeeds(medical, exercise, food, special) {
    let body = { medical, exercise, food, special };

    return await this._doFetch("/pets/register", "POST", body);
  }

  // Private method for internal use only

  static async _doFetch(url, method = "GET", body = null) {
    // Prepare fetch() options
    let options = {
      method,
      headers: {},
    };

    // Add token to headers if it exists in localStorage
    let token = Local.getToken();
    if (token) {
      options.headers["Authorization"] = "Bearer " + token;
    }

    // Add the body if one is supplied
    if (body) {
      options.headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(body);
    }

    // Do the fetch() and store the results in a "unified" myresponse obj
    let myresponse = { ok: false, data: null, status: 0, error: "" };
    try {
      let response = await fetch(url, options);
      if (response.ok) {
        myresponse.ok = true;
        myresponse.data = await response.json();
        myresponse.status = response.status;
      } else {
        myresponse.status = response.status;
        myresponse.error = response.statusText;
      }
    } catch (err) {
      myresponse.error = err.message;
    }

    return myresponse;
  }
}

export default Api;
