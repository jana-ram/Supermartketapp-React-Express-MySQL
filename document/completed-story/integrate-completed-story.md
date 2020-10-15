END PONT : http://localhost:3001
user : janakiraman
pass : 11223344
Authorization: bearer YXBpOnRlc3RhcGkh

## User stories

### Story 1 - Accepting command line ( or $_GET in PHP)

As a **user running the command line application**<br />
I can **supply a valid store ID on the command line**<br />
So that **I can query the Touch2Success API for results**

#### Acceptance criteria

* Command line parameter accepted

---

### Story 2 - Querying the API

As an **API consumer**<br />
I want to **query the store API**<br />
So that **I can output core store details**

#### Acceptance criteria

* Must provide valid headers
* For known store ID 123, some results are returned

---

### Story 3 - Outputting results

As a **user running the command line application**<br />
When I **search for a valid store ID**<br />
I want **store details printed into active window**

#### Acceptance criteria

* Name, Address and Open times for the store printed into active window