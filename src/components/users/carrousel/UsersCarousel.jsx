import UsersCard from "../UsersCard";
import "./carousel.css";

export function UsersCarousel({ users }) {
  
  return (
    <div className="overflow-hidden max-w-435 mt-5 border-x-3 py-5 border-primary">
      <div className="scroll-x space-x-6 w-max">
        {[...users, ...users].map((user, index) => (
          <UsersCard
            key={`${user.id}-${index}`}
            user={user}
            classroom={user.classroom}
          />
        ))}
      </div>
    </div>
  );
}
