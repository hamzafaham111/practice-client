import { useQuery, useMutation } from '@apollo/client';
import { GET_PRODUCTS, GET_USERS, CREATE_USER } from './query';
import { useState } from 'react';

const App = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    age: "",
    city: "",
  });

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUser((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  // Initialize the createUser mutation with refetchQueries
  const [createUser, { loading, error }] = useMutation(CREATE_USER, {
    refetchQueries: [{ query: GET_USERS }], // This will re-fetch the GET_USERS query on success
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createUser({ variables: user });
      console.log("User created successfully!");
      setUser({ name: "", email: "", age: "", city: "" }); // Reset form fields
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  // Query to get products
  const { loading: loadingProducts, error: errorProducts, data: dataProducts } = useQuery(GET_PRODUCTS);

  // Query to get users
  const { loading: loadingUsers, error: errorUsers, data: dataUsers } = useQuery(GET_USERS);

  if (loadingProducts || loadingUsers) return <p>Loading...</p>;
  if (errorProducts) return <p>Error fetching products: {errorProducts.message}</p>;
  if (errorUsers) return <p>Error fetching users: {errorUsers.message}</p>;

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", width: "500px", margin: "auto", }}>
        <h2>Create User</h2>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <input type="text" style={{ padding: "5px", marginTop: "10px" }} value={user.name} onChange={handleUserChange} name="name" placeholder="User Name" />
          <input type="text" style={{ padding: "5px", marginTop: "10px" }} value={user.email} onChange={handleUserChange} name="email" placeholder="User Email" />
          <input type="text" style={{ padding: "5px", marginTop: "10px" }} value={user.age} onChange={handleUserChange} name="age" placeholder="Age" />
          <input type="text" style={{ padding: "5px", marginTop: "10px" }} value={user.city} onChange={handleUserChange} name="city" placeholder="City" />
        </div>
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Creating..." : "Create"}
        </button>
        {error && <p>Error: {error.message}</p>}
      </div>


      <div style={{display:"flex", border:"solid lightgray 1px", marginTop:"20px", padding:"20px"}}>
        <div style={{ display: "flex", flexDirection: "column", width: "500px", margin: "auto", }}>
          <h2>Users:</h2>
          {dataUsers.users.map((user) => (
            <div key={user._id} style={{ border: "solid lightgray 1px", padding: "5px", marginTop:"10px" }}>{user.name}</div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", width: "500px", margin: "auto", }}>
          <h2>Products:</h2>
          {dataProducts.products.map((product) => (
            <div key={product._id} style={{ border: "solid lightgray 1px", padding: "5px", marginTop:"10px" }}>{product.name}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
