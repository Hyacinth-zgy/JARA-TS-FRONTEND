import {useState, useEffect} from 'react';
export const SearchPannel = () => {
  const [param, setParam] = useState({
    name: '',
    personId: '',
  });
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  
  useEffect(() => {
    fetch('').then(async (res) => {
      if (res.ok) {
        setList(await res.json());
      }
    });
  }, [param]);
  return (
    <form action="">
      <input
        type="text"
        value={param.name}
        onChange={(evt) => {
          setParam({
            ...param,
            name: evt.target.value,
          });
        }}
      />
      <select
        name=""
        id=""
        value={param.personId}
        onChange={(evt) => {
          setParam({
            ...param,
            personId: evt.target.value,
          });
        }}
      >
        <option value="">负责人</option>
        {users.map((user) => {
          return <option value={user.id}>{user.name}</option>;
        })}
      </select>
    </form>
  );
};
