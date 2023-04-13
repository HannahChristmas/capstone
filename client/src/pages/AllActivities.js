// import ActivityNav from '../components/ActivityNav';

function AllActivities({activities}) {

  return (
    <>
      <div className="all-activities">
        <h1>All activities</h1>
        {activities.map((activity) => (
          <div key={activity.id}>
            <h1>{activity.title}</h1>
            <h2>{activity.neighborhood}</h2>
            <h4>${activity.cost}</h4>
            <p>{activity.address}</p>
            <p>{activity.phone_number}</p>
            <p>{activity.website}</p>
          </div>
        ))}
      </div>



   <div id="login-footer">
    {/* <img id="footer-image" src="https://i.ibb.co/qFPpqCQ/skyline3.png" alt="skyline"/> */}
   </div>
   </>
  );
}

export default AllActivities;
