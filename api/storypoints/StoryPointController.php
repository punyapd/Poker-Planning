<?php
class StoryPointController
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
                if (isset($_GET["session_id"]) && isset($_GET["story_id"])) {
                    $session_id = $_GET["session_id"];
                    $story_id = $_GET["story_id"];
                    $this->getStoryPoints($session_id, $story_id);
                }
                break;
            case 'PATCH':
                // $this->updateData();
                break;
            default:
                $this->errroMessage();
        }
    }






    //functin for getting single session detail

    private function getStoryPoints($session_id, $story_id)
    {
        $sqlmembers = "SELECT * FROM `members` WHERE `session` = '$session_id'";

        $resultmembers = mysqli_query($this->db, $sqlmembers);
        $re = mysqli_query($this->db, $sqlmembers);
        $allusers = $this->loopMembers($re, $story_id);

        if ($resultmembers) {

            $data = new stdClass();

            $data->members = $allusers;

            $response = [
                'status' => 200,
                'message' => "storypoint  fetched successfully",
                'data' => $data

            ];
            header('HTTP/1.0 200 GET');
            echo json_encode($response);
        } else {
            $response = [
                'status' => 500,
                'message' => " stories Not Found",
                'id' => $session_id

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
            $this->postStoryPoints($_POST);  //for form data
        } else {
            $this->postStoryPoints($data);   // for raw data
        }
    }


    //function for user register

    private function postStoryPoints($data)
    {
        $user_id = mysqli_real_escape_string($this->db, $data["user_id"]);
        $story_id = mysqli_real_escape_string($this->db, $data["story_id"]);
        $story_point = mysqli_real_escape_string($this->db, $data["story_point"]);


        $sheckStoryPoint = " SELECT * FROM `storypoints` WHERE `user_id` = '$user_id' AND `story_id` = '$story_id'";
        $storyPointExist = mysqli_query($this->db, $sheckStoryPoint);



        if (empty(trim($user_id))) {
            return $this->error422("user id field cannnot be empty");
        } elseif (empty(trim($story_id))) {

            return $this->error422("story id field cannnot be empty");
        } else {
            if (mysqli_num_rows($storyPointExist)) {
                $sql = "UPDATE `storypoints` SET `story_point` = '$story_point'
                WHERE `user_id` = '$user_id' AND `story_Id` = '$story_id'";
            } else {

                $sql = "INSERT INTO `storypoints`(`user_id`,`story_id` , `story_point`) VALUES('$user_id','$story_id' , '$story_point')";
            }
            $result = mysqli_query($this->db, $sql);
            if ($result) {
                $response = [
                    'status' => 201,
                    'message' => "session created successfully",
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
    // private function postData()

    // {


    //     $raw_data = file_get_contents('php://input');
    //     $data = json_decode($raw_data, true);
    //     $this->postStoryPoints($data);  //for form data

    // }


    private function updateStoryPoints($data)
    {



        $vote = mysqli_real_escape_string($this->db, $data["vote"]);
        $user = mysqli_real_escape_string($this->db, $data["user"]);
        $session = mysqli_real_escape_string($this->db, $data["session"]);




        $sql = "UPDATE `members` SET `vote` = '$vote' WHERE `user` = '$user' AND `session` = '$session'";
        $result = mysqli_query($this->db, $sql);
        if ($result) {
            $response = [
                'status' => 200,
                'message' => "vote updated successfully",

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

    private function loopMembers($resultmembers, $story_id)


    {
        $users = array();
        while ($row = mysqli_fetch_assoc($resultmembers)) {
            $userid = $row["user"];

            $queryuser = "SELECT * FROM `users` WHERE `id` = '$userid'";
            $resultuser = mysqli_query($this->db, $queryuser);
            $rowuser = mysqli_fetch_assoc($resultuser);

            $querypoint = "SELECT `story_point` FROM `storypoints` WHERE `user_id` = '$userid' AND `story_id` = '$story_id'";
            $resultpoint = mysqli_query($this->db, $querypoint);
            $rowpoint = mysqli_fetch_assoc($resultpoint);

            $user = new stdClass();
            $user->name = $rowuser["full_name"];
            $user->story_point = $rowpoint["story_point"] ?? null;
            $users[] = $user;
        }
        return $users;
    }
}
