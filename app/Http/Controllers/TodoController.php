<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Todolist;
use Response;

class TodoController extends Controller
{
    public function index(){
        return Todolist::all();
    }

    public function getAllActiveTodos(){
         return Todolist::where('IsDone', false)->get();
    }

    public function getAllCompletedTodos(){
         return Todolist::where('IsDone', true)->get();
    }

    public function store(Request $request){
        $todo = new Todolist($request->all());
        $todo->save(); 
        return Response::json($todo);
    }

    public function show($id){
        return Todolist::find($id);
    }

    public function update(Request $request, $id){
        $todo = Todolist::find($id);
        $todo->TodoName = $request->TodoName;
        $todo->IsDone = $request->IsDone;
        $todo->save();
 
        return Response::json($todo);
    }
}
