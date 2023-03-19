<?php


class JoinController
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

            default:
                $this->errroMessage();
        }
    }




    //postdata function

    private function postData()
    {
        $data = json_decode(file_get_contents("php://input"), true);
        if (empty($data)) {
            $this->JoinSession($_POST);  //for form data
        } else {
            $this->JoinSession($data);   // for raw data
        }
    }


    //function for retreiving all stories



    //function for retreiving single story



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

    private function JoinSession($data)
    {
        $user = mysqli_real_escape_string($this->db, $data["user"]);
        $session = mysqli_real_escape_string($this->db, $data["session"]);



        if (empty(trim($user))) {
            return $this->error422("user field cannnot be empty");
        } elseif (empty(trim($session))) {

            return $this->error422("session field cannnot be empty");
        } else {

            if ($this->checkIfSessionExist($session)) {


                if ($this->checkIfJoined($user, $session)) {
                    $response = [
                        'status' => 409,
                        'message' => "user Already joined"
                    ];
                    header('HTTP/1.0 409 user joined ');
                    echo json_encode($response);
                } else {

                    $sql = "INSERT INTO `members`(`user`,`session`) VALUES('$user','$session')";
                    $result = mysqli_query($this->db, $sql);
                    if ($result) {
                        $response = [
                            'status' => 201,
                            'message' => "user joined successfully",
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
            } else {
                $response = [
                    'status' => 500,
                    'message' => "session not found",

                ];
                header('HTTP/1.0 500  Not Found!!!');
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


    private function checkIfJoined($user, $session)
    {
        $exist =  null;
        try {

            $sql = "SELECT * FROM `members` WHERE `user`='$user' AND `session`='$session'";

            $result = $this->db->query($sql);

            if ($result->num_rows > 0) {
                $exist = true;
            } else {
                $exist = false;
            }
        } catch (Exception $e) {
            header("HTTP/1.1 500 Server Error");
            $response = array('message' => $e->getMessage());
            echo json_encode($response);
        }

        return $exist;
    }

    private function checkIfSessionExist($session)
    {
        $exist =  null;
        try {

            $sql = "SELECT * FROM `sessions` WHERE `session_id`='$session'";

            $result = $this->db->query($sql);

            if ($result->num_rows > 0) {
                $exist = true;
            } else {
                $exist = false;
            }
        } catch (Exception $e) {
            header("HTTP/1.1 500 Server Error");
            $response = array('message' => $e->getMessage());
            echo json_encode($response);
        }

        return $exist;
    }
}
