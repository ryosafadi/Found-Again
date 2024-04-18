class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title);
        this.engine.addChoice("Begin");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation);
    }
}

class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Locations[key];
        if(locationData.Body2 && this.engine.hasFlower) this.engine.show(locationData.Body2);
        else this.engine.show(locationData.Body);
        
        if(locationData.Choices) {
            for(let choice of locationData.Choices) {
                if(choice.Lock){
                    if (this.engine.hasFlower) this.engine.addChoice(choice.Text, choice);
                }
                else if(choice.Key && this.engine.hasFlower) continue;
                else this.engine.addChoice(choice.Text, choice);
            }
        } else {
            this.engine.addChoice("Credits")
        }
    }

    handleChoice(choice) {
        if(choice) {
            this.engine.show("&gt; "+choice.Text);
            if(choice.Key){
                this.engine.hasFlower = true;
            }
            if(choice.Mechanism) {
                this.engine.gotoScene(Interactive, choice.Target);
            } else {
                this.engine.show("<hr>");
                this.engine.gotoScene(Location, choice.Target);
            }
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class Interactive extends Location {
    create(key) {
        let locationData = this.engine.storyData.Locations[key];
        this.engine.show(locationData.MechanismMsg);
        
        for(let choice of locationData.Choices) {
            if(!choice.Mechanism) this.engine.addChoice(choice.Text, choice);
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');