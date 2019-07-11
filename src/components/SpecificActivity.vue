<template>
<div>
<q-dialog persistant v-model="icon">
    <q-card dense style="min-width:50%;max-width:50%">
        <q-card-section class="row items-center">
            <div class="text-h6" style="margin:0 auto;">{{activity.name}}</div>
        </q-card-section>

        <q-card-section position="bottom-right" style="text-align:right">
            <div class="q-gutter-sm">
                <q-btn outline color="primary" label="Create" style="text-align:right" @click="" v-close-popup></q-btn>
                <q-btn v-close-popup label="Cancel" outline color="negative" style="text-align:right"
                ></q-btn>
            </div>
        </q-card-section>
    </q-card>
</q-dialog>
</div>


</template>

<script>
export default {
    props: {
      activity: {
        type: Object
      },
      doesntmatterkey: {
        type: Number,
        default: 1
      }
    },
    watch: {
      'doesntmatterkey': function() {
        this.icon = true
      }
    },
    data: function () {
        return {
            icon: false,
        }
    },
    methods: {

    }
}
</script>

<style>

</style>
