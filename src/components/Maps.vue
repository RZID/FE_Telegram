<template>
  <div>
    <div class="d-flex h-100 w-100">
      <GmapMap
        :center="center"
        :zoom="15"
        map-type-id="terrain"
        style="height: 50vh; width: 100%"
      >
        <GmapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          @click="center = m.position"
        />
      </GmapMap>
    </div>
  </div>
</template>
<script>
export default {
  props: ["lat", "long"],
  data: () => {
    return {
      center: { lat: -6.450968, lng: 106.8768418 },
      markers: [{ id: "c", position: { lat: -6.1753924, lng: 106.8249641 } }],
    };
  },
  mounted() {
    console.log(this.lat);
    console.log(this.long);
    this.center = {
      lat: isNaN(Number(this.lat)) ? 0 : Number(this.lat),
      lng: isNaN(Number(this.long)) ? 0 : Number(this.long),
    };
    this.markers = [
      {
        id: "position",
        position: {
          lat: isNaN(Number(this.lat)) ? 0 : Number(this.lat),
          lng: isNaN(Number(this.long)) ? 0 : Number(this.long),
        },
      },
    ];
  },
};
</script>
