// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Todo {
    enum Status {
        Pending,
        Accepted
    }
    address owner;
    struct Stask {
        string desc;
        Status status;
    }
     Stask[] public tasks;
     
     constructor () {
        owner = msg.sender;
     }

     modifier onlyOwner {
        require(msg.sender == owner,"Only the owner can use this function");
        _;
     }

     function addTask(string memory _desc) public onlyOwner{
        tasks.push(Stask(_desc,Status.Pending));
     }

     function finished(uint256 _id) public onlyOwner {
       require(_id < tasks.length, "Task ID out of bounds");
       tasks[_id].status = Status.Accepted;
     }

     function getStaskCount() public view returns(uint256){
        return tasks.length;
     }

     function getAllStask() public view returns(Stask[] memory){
        return tasks;
     }

     function getStask(uint256 id) public view returns(string memory desc, Status status){
        require(id < tasks.length, "Task ID out of bounds");
        Stask storage task = tasks[id];
        return (task.desc, task.status);
     }

     function removeStask(uint256 id) public onlyOwner{
          require(id < tasks.length, "Task ID out of bounds");
          for(uint256 i = id; i< tasks.length -1 ; i++){
            tasks[i] = tasks[i+1];
          }
          tasks.pop();
     }
}