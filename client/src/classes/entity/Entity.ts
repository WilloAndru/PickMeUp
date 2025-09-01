type Gender = 'male' | 'female';

interface EntityProps {
    id: number;
    isCharacter: boolean;
    image: string;
    name: string;
    age: number;
    gender: Gender;
    curiosity: number;
    sociable: number;
    brave: number;
    level?: number;
    health: number;
    attack: number;
    attackSpeed: number;
    movementSpeed: number;
}

export default class Entity {
    id: number;
    isCharacter: boolean;
    image: string;
    name: string;
    age: number;
    gender: Gender;
    curiosity: number;
    sociable: number;
    brave: number;
    level: number;
    health: number;
    attack: number;
    attackSpeed: number; 
    movementSpeed: number;

    constructor({
        id,
        isCharacter,
        image,
        name,
        age,
        gender,
        curiosity,
        sociable,
        brave,
        level = 1,
        health,
        attack,
        attackSpeed,
        movementSpeed
    }: EntityProps) {
        this.id = id;
        this.isCharacter = isCharacter;
        this.image = image;
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.curiosity = curiosity;
        this.sociable = sociable;
        this.brave = brave;
        this.level = level;
        this.health = health;
        this.attack = attack;
        this.attackSpeed = attackSpeed;
        this.movementSpeed = movementSpeed;
    }


}
