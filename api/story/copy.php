<?php


class StoryController
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
                    $this->getSingleSessionStory($id);
                } else {

                    $this->getAllStories();
                }
                break;
            default:
                $this->errroMessage();
        }
    }




    //postdata function

    private function postData()
    {
        $data = json_decode(file_get_contents("php://input"), true);
        if (empty($data)) {
            $this->createStory($_POST);  //for form data
        } else {
            $this->createStory($data);   // for raw data
        }
    }


    //function for retreiving all stories

    private function getSingleSessionStory($id)
    {
        $sqlStory = "SELECT * FROM `stories` WHERE `session_id` = '$id'";
        $resultstory = mysqli_query($this->db, $sqlStory);

        $sqlmembers = "SELECT * FROM `members` WHERE `session` = '$id'";
        $resultmembers = mysqli_query($this->db, $sqlmembers);

        $sqlsession = "SELECT * FROM `sessions` WHERE `session_id` = '$id'";

        $result = mysqli_query($this->db, $sqlsession);


        if ($result) {
            $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
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


    //function for retreiving single story
    private function getALLStories()
    {
        echo "get single stories";
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

    //function for user register

    private function createStory($data)
    {
        $name = mysqli_real_escape_string($this->db, $data["story_name"]);
        $description = mysqli_real_escape_string($this->db, $data["description"]);
        $session_id = $data["session_id"];



        if (empty(trim($name))) {
            return $this->error422("name field cannnot be empty");
        } elseif (empty(trim($description))) {

            return $this->error422("description field cannnot be empty");
        } elseif (empty($session_id)) {
            return $this->error422("session id is required ");
        } else {

            $sql = "INSERT INTO `stories`(`name`,`description` , `session_id`) VALUES('$name','$description' , '$session_id')";
            $result = mysqli_query($this->db, $sql);
            if ($result) {
                $response = [
                    'status' => 201,
                    'message' => "story addded successfully",
                    'id' => $session_id
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
}
