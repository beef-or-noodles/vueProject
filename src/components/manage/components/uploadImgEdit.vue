<template>
    <div>
        <div class="copper">
            <vueCropper
                    ref="cropper"
                    :img="option.img"
                    :outputSize="option.size"
                    :outputType="option.outputType"
                    :fixedBox="option.fixedBox"
                    :centerBox="option.centerBox"
            ></vueCropper>
        </div>
        <div class="btnBox">
            <el-button type="primary"></el-button>
        </div>
    </div>

</template>

<script>
    import {VueCropper} from "vue-cropper";

    export default {
        name: "uploadImgEdit",
        components: {
            VueCropper
        },
        data() {
            return {
                option: {
                    img: "",
                    outputType: "png",
                    fixedBox: true,
                    centerBox: true,
                }
            }
        },
        methods: {
            name() {

            }
        },
    }
</script>

<style scoped>

</style>