<?php
class SessionController
{
    private $db;
    private $requestMethod;

    public function __construct($db, $requestMethod)
    {
        $this->db = $db;
        $this->requestMethod = $requestMethod;
    }


    public function processRequest()
    {
        switch ($this->requestMethod) {
            case "POST":
                $this->postData();
                break;
            case "GET":
                if (isset($_GET["id"])) {
                    $id = $_GET["id"];
                    $this->getSingleSession($id);
                } else {

                    $this->getAllSessions();
                }
                break;
            case "PATCH":
                $this->updateSession();
                break;
            default:
                $this->errroMessage();
        }
    }




    //function for getting all the sessions ;
    private function getAllSessions()
    {
        $sql = "SELECT * FROM `sessions`";
        $result = mysqli_query($this->db, $sql);
        $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
        if ($result) {
            $response = [
                'status' => 200,
                'message' => "story fetched successfully",
                'data' => $data

            ];
            header('HTTP/1.0 200 GET');
            echo json_encode($response);
        }
    }

    //functin for getting single session detail

    private function getSingleSession($id)
    {

        $sqlStory = "SELECT * FROM `stories` WHERE `session_id` = '$id'";
        $resultstory = mysqli_query($this->db, $sqlStory);

        $sqlmembers = "SELECT * FROM `members` WHERE `session` = '$id'";

        $resultmembers = mysqli_query($this->db, $sqlmembers);
        $re = mysqli_query($this->db, $sqlmembers);

        $allusers = $this->loopMembers($re);




        $sqlsession = "SELECT * FROM `sessions` WHERE `session_id` = '$id'";

        $resultsession = mysqli_query($this->db, $sqlsession);


        if ($resultstory && $resultmembers && $resultsession) {
            $storyData = mysqli_fetch_all($resultstory, MYSQLI_ASSOC);
            $membersData = mysqli_fetch_all($resultmembers, MYSQLI_ASSOC);
            $sessionData = mysqli_fetch_all($resultsession, MYSQLI_ASSOC);

            $data = new stdClass();
            $data->stories = $storyData;
            $data->members = $allusers;
            $data->session = $sessionData;

            $response = [
                'status' => 200,
                'message' => "story fetched successfully",
                'data' => $data

            ];
            header('HTTP/1.0 200 GET');
            echo json_encode($response);
        } else {
            $response = [
                'status' => 500,
                'message' => " stories Not Found",
                'id' => $id

            ];
            header('HTTP/1.0 500  Internal Server Error');
            echo json_encode($response);
        }
    }


    //function for posing data for sessions

    private function postData()
    {
        $data = json_decode(file_get_contents("php://input"), true);
        if (empty($data)) {
            $this->createSession($_POST);  //for form data
        } else {
            $this->createSession($data);   // for raw data
        }
    }


    //function for user register

    private function createSession($data)
    {
        $name = mysqli_real_escape_string($this->db, $data["name"]);
        $moderator = mysqli_real_escape_string($this->db, $data["moderator"]);

        $query = "SELECT UUID() as uuid";
        $result = mysqli_query($this->db, $query);
        $row  = mysqli_fetch_assoc($result);
        $uuid = ($row["uuid"]);

        if (empty(trim($name))) {
            return $this->error422("name field cannnot be empty");
        } elseif (empty(trim($moderator))) {

            return $this->error422("moderator field cannnot be empty");
        } else {

            $sql = "INSERT INTO `sessions`(`name`,`moderator` , `session_id`) VALUES('$name','$moderator' , '$uuid')";
            $queryMember = "INSERT INTO `members`(`user` , `session`) VALUES('$moderator' , '$uuid')";
            $result = mysqli_query($this->db, $sql);
            $result1 = mysqli_query($this->db, $queryMember);
            if ($result && $result1) {
                $response = [
                    'status' => 201,
                    'message' => "session created successfully",
                    'id' => $uuid
                ];
                header('HTTP/1.0 201 created');
                echo json_encode($response);
            } else {
                $response = [
                    'status' => 500,
                    'message' => " Internal Server Error",

                ];
                header('HTTP/1.0 500  Internal Server Error');
                echo json_encode($response);
            }
        }
    }

    //function for updating users vote
    private function updateSession()

    {


        $raw_data = file_get_contents('php://input');
        $data = json_decode($raw_data, true);



        $session = mysqli_real_escape_string($this->db, $data["session"]);
        $story_id = mysqli_real_escape_string($this->db, $data["story_id"]);




        $checkRevealQuery = " SELECT * FROM `sessions` WHERE `session_id` = '$session'";
        $revealStatus = mysqli_query($this->db, $checkRevealQuery);
        $result = mysqli_fetch_assoc($revealStatus);


        if ($result["is_revealed"] == '0') {

            $sql = "UPDATE `sessions` SET `is_revealed` = '1' WHERE `session_id` = '$session'";
        } else {
            $sql = "UPDATE `sessions` SET `is_revealed` = '0' WHERE `session_id` = '$session'";
            $queryupdate  = "UPDATE  `storypoints` SET `story_point` = NULL  WHERE `story_id` = '$story_id'";
            $updateresult = mysqli_query($this->db, $queryupdate);
        }
        $result1 = mysqli_query($this->db, $sql);
        if ($result1) {
            $response = [
                'status' => 200,
                'message' => "session updated successfully",

            ];
            header('HTTP/1.1 200 OK');
            echo json_encode($response);
        } else {
            $response = [
                'status' => 500,
                'message' => " Internal Server Error",

            ];
            header('HTTP/1.0 500  Internal Server Error');
            echo json_encode($response);
        }
    }









    //function for showing input validation error

    private function error422($msg)
    {
        $response = [
            'status' => 422,
            'message' => $msg
        ];
        header('HTTP/1.0 422 Could Not Process Empty Data.');
        echo json_encode($response);
        exit();
    }



    private function errroMessage()
    {
        $response = [
            'status' => 405,
            'message' => $this->requestMethod . " Method Not Allowed ggggg"
        ];
        header('HTTP/1.0 405 Method Not Allowed');
        echo json_encode($response);
    }

    private function loopMembers($resultmembers)
    {
        $i = 1;
        $users = array();
        while ($row = mysqli_fetch_assoc($resultmembers)) {
            $userid = $row["user"];
            $userVote = $row["vote"];
            $q = "SELECT * FROM `users` WHERE `id` = '$userid'";
            $r = mysqli_query($this->db, $q);
            $p = mysqli_fetch_assoc($r);
            $user = new stdClass();
            $user->name = $p["full_name"];
            $user->vote = $userVote;
            $users[] = $user;
        }
        return $users;
    }
}
