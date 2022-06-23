# Hydrarchy
## Generated Documentation as a Hydra Plugout 
### Spins up a Local Server for Teams to Collaborate Quickly and Dynamically on a Local Area Network Server
In the future, it will professionalize with community support

![2c607-sea-serpent](https://user-images.githubusercontent.com/107733608/174912964-77b2a004-4cb4-4c82-b166-39f361dd4562.jpg)

Hydrarchy looks at the following schema
## Schema:
    {
    @/some/path/to/cool.hydra import CoolObject as Cool
      
        Hydra: {
            objName1:{
              type: "Class",
              parent: Cool,
              props:{
                size: 10,
                desc: "small thing"
              },
              methods:{
                size: get_size()
              }
            },

            objName2:{
              type: "Class",
              props:{
                size: 14,
                desc: "strong thing"
              },
              methods:{
                strength: get_strength()
              }
            },

            objName3:{
              type: "Class",
              props:{
                size: 18,
                desc: "weighty thing"
              },
              methods:{
                weight: get_weight()
              }
            }

        }
    
    }
