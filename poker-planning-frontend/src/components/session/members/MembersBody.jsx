import React from "react";
import Avatar from "../../reusable/Avatar";

const MembersBody = ({ isReveal, members }) => {
  return (
    <section className="session-members-body">
      <ul className="session-members-body__list">
        {members?.data?.members.map((user, index) => (
          <li
            className="session-members-body__list__item"
            key={index}
            style={
              user.story_point
                ? { borderLeft: "5px solid #7f56da" }
                : { borderLeft: "5px solid #fff" }
            }
          >
            <div className="session-members-body__list__item__userinfo">
              <Avatar letter={user.name.charAt(0)} />
              <span>{user.name}</span>
            </div>

            <span>{isReveal == "1" ? user.story_point : " "}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MembersBody;
