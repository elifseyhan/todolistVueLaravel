<template>
    <div class="item">
        <!-- MySQL boolean type changing to tinyint type, also item.completed returns true and false values.
        completed column not changed on database.
        That's why added v-bind:true-value and v-bind:false-value for connect MySQL and Vue.
        -->
        <input 
            type="checkbox"
            @change="updateCheck()"
            v-model="item.completed"
            v-bind:true-value="1"
            v-bind:false-value="0"
        />
        <span :class="[item.completed ? 'completed' : '', 'itemText']">{{ item.name }}</span>
        <button @click="removeItem()" class="trashcan">
            <font-awesome-icon icon="trash"/>
        </button>
    </div>
</template>

<script>

export default{
    props: ['item'],
    methods: {
        updateCheck(){
            axios.put('api/item/' + this.item.id, {
                item: this.item
            })
            .then(response => {
                if(response.status == 200){
                    this.$emit('itemchanged');
                }
            })
            .catch(error =>{
                console.log(error);
            })
        },
        removeItem(){
            axios.delete('api/item/' + this.item.id)
            .then(response => {
                if( response.status == 200){
                    this.$emit('itemchanged');
                }
            })
            .catch( error => {
                console.log(error);
            })
        }
    }
}
</script>
<style scoped>
    .completed{
        text-decoration: line-through;
        color: #999999;
    }

    .itemText{
        width: 100%;
        margin-left: 20px;
    }

    .item{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .trashcan{
        background: #e6e6e6;
        border: none;
        color: #ff0000;
        outline: none;
    }
</style>