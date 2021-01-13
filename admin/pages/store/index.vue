<template>
  <v-container fluid no-gutters align="center" justify="center">
    <v-btn
      to='/store/new'
      color="secondary"
      fixed
      fab
      large
      dark
      bottom
      right
      :loading="loading"
      class="fab"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <v-row>
      <v-col
        shrink
        cols="12"
        sm="6"
        md="4"
        v-for="item in listData"
        :key="item.id"
      >
        <v-card class="mx-auto" max-width="400">
          <v-img
            class="white--text align-end"
            height="200px"
            :src="item.avator"
          >
            <v-card-title>{{ item.name }}</v-card-title>
          </v-img>
          <v-card-subtitle class="pb-0">
            最后更新: {{ item.updateDate }}
          </v-card-subtitle>
          <v-card-actions>
            <v-btn color="orange" text> 编辑信息 </v-btn>
            <v-btn color="orange" text> 爬取商品 </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
  </v-container>
</template>
<script>
export default {
  async asyncData({ app: { $api } }) {
    const { data } = (await $api.get($api.urls.GET_STORE_LIST)) || [];
    console.info(data);
    return {
      listData: data.list,
    };
  },
  data() {
    return {
      listData: [],
    };
  },
};
</script>