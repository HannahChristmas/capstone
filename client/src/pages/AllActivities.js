// import ActivityNav from '../components/ActivityNav';
function AllActivities({activities}) {

  const handleOnClick = () => {
    console.log("I clicked this button")
}

  return (
    <>
      <div className="all-activities">
        <h1>All activities</h1>
        {activities.map((activity) => (
          <div key={activity.id}>
            <h1>{activity.title}</h1>
            <h2>{activity.neighborhood}</h2>
            <h4>${activity.cost}</h4>
            <button onClick={handleOnClick}>Quick View</button>
          </div>          
        ))}
      </div>
   </>
  );
}

export default AllActivities;
