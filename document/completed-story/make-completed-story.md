END PONT : http://localhost:3001
user : janakiraman
pass : 11223344
Authorization: bearer YXBpOnRlc3RhcGkh

## User stories

### Story 1 - Retrieving a Store by ID
As a **API consumer**
I want to **retrieve a stores details by a stores ID**
So that **I can view the store details**

#### Acceptance criteria

* Accept Store ID as a parameter
* Return all Store details for the requested Store ID

---

### Story 2 - Retrieving list of Stores

As an **API consumer**
I want to **retrieve a list of stores with id's and names**
So that **I can view the list of stores**

#### Acceptance criteria

* Return all Stores. Only Store ID and Store Name

---

### Story 3 - Update a Store

As an **API consumer**
I want to **update any data belonging to a particular store**
So that **I can update any store details as and when required**

#### Acceptance criteria

* Able to update any data for a Store
* Requested Update Data is validated (best guess)
    * Informative &amp; relevant error message returned for invalid data
* Requested Update Data is sanitised
* Requested Update Data is formatted

--

### Story 4 - Search for Store

As an **API consumer**
I want to **search a store by name**
So that **I find the a store if it exists**

#### Acceptance criteria

* Ability to search partial name or full name of Store
* Maximum of 5 results returned.
* Return Store id and name

---

### Story 5 - Authentication

As an **API provider**
I want to **ensure only authorised user can access my API**
So that **my data is protected and secure**

#### Acceptance criteria

* Unauthorised requests should return denied when attempting to access to any endpoint
* Authorisation requested should return the expected response