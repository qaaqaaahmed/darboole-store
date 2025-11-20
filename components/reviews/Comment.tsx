"use client";
import { useState } from "react";
import { Button } from "../ui/button";

function Comment({ comment }: { comment: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded((expanded) => !expanded);
  };
  const longComment = comment.length > 130;

  const displayComment =
    longComment && !isExpanded ? `${comment.slice(0, 130)}...` : comment;

  return (
    <div className="mt-2">
      <p className="text-sm break-words pl-8">{displayComment}</p>
      {longComment && (
        <Button
          variant="link"
          className="pl-0 text-muted-foreground"
          onClick={toggleExpanded}
        >
          {isExpanded ? "see less" : "see more"}
        </Button>
      )}
    </div>
  );
}

export default Comment;
