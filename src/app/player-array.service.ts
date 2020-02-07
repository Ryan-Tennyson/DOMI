import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { treasure } from '../../assets/treasure.json';
//import { AttackService } from './attack.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerArrayService {

  constructor(
    private router: Router
    //private attkServ: AttackService
  ) {}

  //name
  name = <string> 'Brave Adventurer';
  
  setName(newName){
    if(newName){
      this.name = newName;
    } else { 
      this.name = 'Brave Adventurer';
    }
  }

  getName(){
    return this.name;
  }

  //inventory
  objectUnique( value ){
    var unique = true;
    this.inventory.forEach(function ( entry )
    {
        if ( entry == value )
        {
            unique = false;
        }
    });

    return unique;
}

  inventory = [];
  addToInventory(addedItem){
    if(this.objectUnique(addedItem)){
      this.inventory.push(addedItem);
    }
  }

  removeFromInventory(removedItem){
    this.inventory = this.inventory.filter(items => items !== removedItem);
  }

  getInventory(){
    return this.inventory;
  }

  //searching for treasure
  can_search = false;
  getSearchPossible(){
    return this.can_search;
  }

  setSearchPossible(arg){
    return this.can_search = arg;
  }

  treasure_found = false;
  getTreasureFound(){
    return this.treasure_found;
  }

  setTreasureFound(arg){
    return this.treasure_found = arg;
  }


  //health
  health = {maxHP: <number> 4, curHP: <number> 4, bossHP: <number> 8};

  getHealth(){
    return this.health;
  }

  loseHealth(){
    this.health.curHP--;
    if(this.health.curHP === 0 ){
      this.router.navigate(['/endScreen'])
    }
  }

  gainHealth(){
    this.health.curHP++;
    if(this.health.curHP > this.health.maxHP){
      this.health.curHP = this.health.maxHP;
    }
  }

  //fight results
  fight_result = "";

  getFightResult(){
    return this.fight_result;
  }

  setFightResult(result){
    this.fight_result = result;
    return this.fight_result;
  }


  //position
  position = { x: 1, y: 0 };
  count = 0;
  countSub: BehaviorSubject<number> = new BehaviorSubject(0);
  getCount: Observable<number> = this.countSub.asObservable();
    
  setPosition(new_position){
    return this.position = new_position;
  }

  getPosition(){
    return this.position;
  }

  setCount() {
    this.count = this.count+1; 
    this.countSub.next(this.count);
  }

  // getCount(){
  //   return this.count;
  // }

  

  //resetting the game

  clearInventory(){
    this.inventory = [];
    this.health.curHP = this.health.maxHP;
    this.setName('');
    this.count = 0;
    this.router.navigate(['/']);
  }

  restartInventory(){
    this.inventory = [this.inventory[0]];
    this.health.curHP = this.health.maxHP;
  }

  resetPosition(){
    this.setPosition({x:1, y:0});
  }
}
