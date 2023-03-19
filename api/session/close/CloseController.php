<?php
class CloseController
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

            case 'PATCH':
                $this->updateSession();
                break;
            default:
                $this->errroMessage();
        }
    }

    private function updateSession()
    {

        $raw_data = file_get_contents('php://input');
        $data = json_decode($raw_data, true);

        $session = mysqli_real_escape_string($this->db, $data["session"]);

        $sql = "UPDATE `sessions` SET `status` = 'closed' WHERE `session_id` = '$session'";
        $result = mysqli_query($this->db, $sql);
        if ($result) {
            $response = [
                'status' => 200,
                'message' => "session closed successfully",

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





    private function errroMessage()
    {
        $response = [
            'status' => 405,
            'message' => $this->requestMethod . " Method Not Allowed ggggg"
        ];
        header('HTTP/1.0 405 Method Not Allowed');
        echo json_encode($response);
    }
}
