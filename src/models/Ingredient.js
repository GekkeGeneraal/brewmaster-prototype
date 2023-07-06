export default class Ingredient {

    constructor(id, name) {
        this.name = name;
        this.id = id;
        this.prepared = false;
        this.type = '';
        this.propertyMap = {};
    }
}
